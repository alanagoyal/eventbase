var $kLydb$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $kLydb$react = require("react");
var $kLydb$radixuiprimitive = require("@radix-ui/primitive");
var $kLydb$radixuireactusecontrollablestate = require("@radix-ui/react-use-controllable-state");
var $kLydb$radixuireactprimitive = require("@radix-ui/react-primitive");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "Toggle", () => $7d30e3d88c861f40$export$bea8ebba691c5813);
$parcel$export(module.exports, "Root", () => $7d30e3d88c861f40$export$be92b6f5f03c0fe9);





/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/ const $7d30e3d88c861f40$var$NAME = 'Toggle';
const $7d30e3d88c861f40$export$bea8ebba691c5813 = /*#__PURE__*/ $kLydb$react.forwardRef((props, forwardedRef)=>{
    const { pressed: pressedProp , defaultPressed: defaultPressed = false , onPressedChange: onPressedChange , ...buttonProps } = props;
    const [pressed = false, setPressed] = $kLydb$radixuireactusecontrollablestate.useControllableState({
        prop: pressedProp,
        onChange: onPressedChange,
        defaultProp: defaultPressed
    });
    return /*#__PURE__*/ $kLydb$react.createElement($kLydb$radixuireactprimitive.Primitive.button, ($parcel$interopDefault($kLydb$babelruntimehelpersextends))({
        type: "button",
        "aria-pressed": pressed,
        "data-state": pressed ? 'on' : 'off',
        "data-disabled": props.disabled ? '' : undefined
    }, buttonProps, {
        ref: forwardedRef,
        onClick: $kLydb$radixuiprimitive.composeEventHandlers(props.onClick, ()=>{
            if (!props.disabled) setPressed(!pressed);
        })
    }));
});
/*#__PURE__*/ Object.assign($7d30e3d88c861f40$export$bea8ebba691c5813, {
    displayName: $7d30e3d88c861f40$var$NAME
});
/* ---------------------------------------------------------------------------------------------- */ const $7d30e3d88c861f40$export$be92b6f5f03c0fe9 = $7d30e3d88c861f40$export$bea8ebba691c5813;




//# sourceMappingURL=index.js.map
