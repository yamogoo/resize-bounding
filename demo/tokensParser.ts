import fs from "node:fs/promises";
import { readFileSync } from "node:fs";

type List<T> = Array<T>;

interface IMap {
  [key: string]: Value<unknown>;
}

type Value<T> = string | number | List<T> | T | IMap;

interface ParseValueOptions {
  convertCase: boolean;
  convertPxToRem: boolean;
}

type ParseMapOptions = ParseValueOptions;

interface JSONToSCSSOptions {
  name: string;
  header: string;
  comment: string;
  options: Partial<ParseMapOptions>;
}

interface TokensParserOptions {
  source: string;
  outDir: string;
}

abstract class Parser {
  abstract parseValue<T>(value: Value<T>, opts: ParseValueOptions): Value<T>;
  abstract parseList(list: List<unknown>, opts: ParseValueOptions): string;
  abstract parseMap<T extends object>(
    map: Value<T>,
    opts: ParseMapOptions,
  ): string;
}

export class SCSSParser extends Parser {
  private tokensParser: TokensParser;

  constructor(tokensParser: TokensParser) {
    super();
    this.tokensParser = tokensParser;
  }

  parseValue<T>(value: Value<T>, opts: ParseValueOptions): Value<T> {
    const { convertPxToRem } = opts as ParseMapOptions;

    if (Array.isArray(value)) return this.parseList(value as List<unknown>, opts);
    else if (isPlainObject(value)) return this.parseMap(value as IMap, opts);
    else if (value === "") return '""';
    else if (typeof value === "string")
      return this.tokensParser.parseNestedValue(value, opts);
    else if (typeof value === "number")
      return convertPxToRem
        ? this.tokensParser.valuePxToRem(value)
        : `${value}px`;
    else return value;
  }

  parseList(list: List<unknown>, opts: ParseValueOptions): string {
    return `${list.map((value) => this.parseValue(value, opts)).join(" ")}`;
  }

  parseMap<T extends object>(map: Value<T>, opts: ParseMapOptions): string {
    const { convertCase = false } = {
      ...opts,
      convertPxToRem: true,
    } as ParseMapOptions;
    if (typeof map === "string")
      return this.tokensParser.parseNestedValue(map, opts);
    return `(${Object.keys(map)
      .filter((key) => this.tokensParser.isKeyValidated(key))
      .map((key) => {
        const value = map[key as keyof typeof map] as unknown as Value<T>;
        return `${convertCase ? this.tokensParser.toKebabCase(key) : key}: ${this.parseValue(value, opts)}`;
      })
      .join(",")})`;
  }
}

function isPlainObject(value: unknown): value is IMap {
  if (value === null || typeof value !== "object") return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export class TokensParser {
  private parser: Parser;

  private opts: TokensParserOptions;

  constructor(opts: TokensParserOptions) {
    this.opts = opts;
    this.parser = new SCSSParser(this);
    const { source, outDir } = opts;
    this.listDir(source, outDir);
  }

  private async listDir(source: string, output: string) {
    try {
      const fileNames = await fs.readdir(source);

      for (const fileName of fileNames) {
        if (/^(?=.).*.json$/.test(fileName)) {
          await this.JSONToSCSS(
            `${source}/${fileName}`,
            `${output}`,
            `_${fileName.replace(".json", ".scss")}`,
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  isKeyValidated(key: string): boolean {
    return /^[^$:].*/.test(key);
  }

  toKebabCase(key: string): string {
    return key
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
      .toLowerCase();
  }

  valuePxToRem(value: number): string {
    return `px2rem(${value}px)`;
  }

  parsePath(path: string) {
    const pathStr = path.replace(/[{()}]/g, "");
    const arr = pathStr.split(".");
    const fileName = arr[0];
    arr.shift();
    const args = arr;
    return {
      path: fileName,
      args,
    };
  }

  getNestedValue(obj: unknown, keys: string[]): unknown {
    return keys.reduce((acc, key) => {
      if (typeof acc === "object" && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }

  parseNestedValue(value: string, opts: ParseValueOptions): string {
    const { convertPxToRem } = opts as ParseMapOptions;

    if (/^{.*}$/.test(value)) {
      const { path, args } = this.parsePath(value);
      const file = readFileSync(`${this.opts.source}/${path}.json`, "utf-8");
      const json = JSON.parse(file);
      const nestedValue = this.getNestedValue(json, args);
      if (typeof nestedValue === "number")
        return convertPxToRem
          ? this.valuePxToRem(nestedValue)
          : `${nestedValue}px`;
      // parse nested path and return result:
      return this.parseNestedValue(nestedValue as string, opts);
    }
    return value;
  }

  private async JSONToSCSS(
    inputPath: string,
    outputDir: string,
    outputFileName: string,
    opts?: Partial<JSONToSCSSOptions>,
  ): Promise<void> {
    const {
      header = "// Generated by tokensParser. ‼️ DO NOT MODIFY THIS FILE ‼️ /\n",
      name = "",
      comment = "",
      options,
    } = { ...opts } as JSONToSCSSOptions;

    const parseOptions: ParseMapOptions = {
      convertCase: false,
      convertPxToRem: false,
      ...options,
    };

    const outputPath = `${outputDir}/${outputFileName}`;

    try {
      const isOutputExists = await fs
        .access(outputDir)
        .then(() => true)
        .catch(() => false);
      if (!isOutputExists) {
        await fs.mkdir(outputDir, { recursive: true });
      }

      const data = await fs.readFile(inputPath, "utf-8");
      const json = JSON.parse(data);
      let content = `${header}\n${comment}\n`;

      for (const [k, v] of Object.entries(json)) {
        const key = `$${k}:`;
        const map = v as unknown as IMap;
        const str = `${key}${this.parser.parseMap(map, parseOptions)};`;
        content += `${str}`;
      }

      await fs.writeFile(outputPath, content);
      console.log(`${name} parsed to ${outputPath}`);
    } catch (err) {
      console.error(err);
    }
  }
}
