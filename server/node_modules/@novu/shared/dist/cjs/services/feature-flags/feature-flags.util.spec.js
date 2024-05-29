"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feature_flags_util_1 = require("./feature-flags.util");
describe('FeatureFlagUtil', () => {
    describe('prepareBooleanStringFeatureFlag', () => {
        it('should return default value when value is undefined', () => {
            expect((0, feature_flags_util_1.prepareBooleanStringFeatureFlag)(undefined, true)).toEqual(true);
        });
        it('should return default value when value is empty string', () => {
            expect((0, feature_flags_util_1.prepareBooleanStringFeatureFlag)('', true)).toEqual(true);
        });
        it('should return true when provided value is true', () => {
            expect((0, feature_flags_util_1.prepareBooleanStringFeatureFlag)('false', true)).toEqual(false);
        });
        it('should return false when provided value is false', () => {
            expect((0, feature_flags_util_1.prepareBooleanStringFeatureFlag)('false', true)).toEqual(false);
        });
    });
});
