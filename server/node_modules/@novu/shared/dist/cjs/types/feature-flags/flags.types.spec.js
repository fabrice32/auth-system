"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidSubjectFlag = exports.invalidSuffixFlag = exports.invalidPrefixFlag = exports.validFlag = void 0;
const flags_types_1 = require("./flags.types");
const feature_flags_1 = require("./feature-flags");
const system_critical_flags_1 = require("./system-critical-flags");
describe('Flags', () => {
    it('tests the Typescript compiler errors below', () => {
        expect(true).toEqual(true);
    });
});
exports.validFlag = 'IS_SOMETHING_ENABLED';
exports.invalidPrefixFlag = 'SOMETHING_ENABLED';
exports.invalidSuffixFlag = 'IS_SOMETHING';
exports.invalidSubjectFlag = 'IS_something_ENABLED';
var ValidFlagsEnum;
(function (ValidFlagsEnum) {
    ValidFlagsEnum["IS_SOMETHING_ENABLED"] = "IS_SOMETHING_ENABLED";
    ValidFlagsEnum["IS_SOMETHING_ELSE_ENABLED"] = "IS_SOMETHING_ELSE_ENABLED";
})(ValidFlagsEnum || (ValidFlagsEnum = {}));
(0, flags_types_1.testFlagEnumValidity)(ValidFlagsEnum);
var InvalidFlagsEnum;
(function (InvalidFlagsEnum) {
    InvalidFlagsEnum["INVALID_ENABLED"] = "INVALID_ENABLED";
})(InvalidFlagsEnum || (InvalidFlagsEnum = {}));
(0, flags_types_1.testFlagEnumValidity)(InvalidFlagsEnum);
var NonMatchingKeyValueEnum;
(function (NonMatchingKeyValueEnum) {
    NonMatchingKeyValueEnum["IS_SOMETHING_ENABLED"] = "IS_SOMETHING_ELSE_ENABLED";
})(NonMatchingKeyValueEnum || (NonMatchingKeyValueEnum = {}));
const validateNonMatchingKeyValueEnum = NonMatchingKeyValueEnum;
const validateFeatureFlagsKeysEnum = feature_flags_1.FeatureFlagsKeysEnum;
(0, flags_types_1.testFlagEnumValidity)(feature_flags_1.FeatureFlagsKeysEnum);
const validateSystemCriticalFlagsEnum = system_critical_flags_1.SystemCriticalFlagsEnum;
(0, flags_types_1.testFlagEnumValidity)(system_critical_flags_1.SystemCriticalFlagsEnum);
