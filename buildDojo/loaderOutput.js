/*
 * (C) Copyright HCL Technologies Ltd. 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = require("fs");

function normalizeOutputType(outputType) {
	outputType = outputType || "cjs";
	if (outputType !== "cjs" && outputType !== "esm") {
		throw new Error(`Unsupported outputType "${outputType}". Expected "cjs" or "esm".`);
	}
	return outputType;
}

function getLoaderVersion(loaderSource) {
	const match = loaderSource.match(/this\.loaderVersion\s*=\s*(["'][^"']+["'])\s*;/);
	if (!match) {
		throw new Error("Unable to locate loaderVersion in embedded loader source.");
	}
	return match[1];
}

function toEsmLoaderSource(loaderSource) {
	const loaderVersion = getLoaderVersion(loaderSource);
	return loaderSource.replace(/^module\.exports = function/, "function loader") +
		`\nloader.loaderVersion = ${loaderVersion};\nexport default loader;\n`;
}

function rewriteLoaderOutputFile(filename, outputType) {
	if (normalizeOutputType(outputType) === "esm") {
		fs.writeFileSync(filename, toEsmLoaderSource(fs.readFileSync(filename, "utf8")), "utf8");
	}
}

module.exports = {
	normalizeOutputType,
	toEsmLoaderSource,
	rewriteLoaderOutputFile
};
