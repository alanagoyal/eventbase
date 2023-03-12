import $5AXX7$babelruntimehelpersesmextends from "@babel/runtime/helpers/esm/extends";
import {forwardRef as $5AXX7$forwardRef, createElement as $5AXX7$createElement} from "react";
import {composeEventHandlers as $5AXX7$composeEventHandlers} from "@radix-ui/primitive";
import {useControllableState as $5AXX7$useControllableState} from "@radix-ui/react-use-controllable-state";
import {Primitive as $5AXX7$Primitive} from "@radix-ui/react-primitive";






/* -------------------------------------------------------------------------------------------------
 * Toggle
 * -----------------------------------------------------------------------------------------------*/ const $b3bbe2732c13b576$var$NAME = 'Toggle';
const $b3bbe2732c13b576$export$bea8ebba691c5813 = /*#__PURE__*/ $5AXX7$forwardRef((props, forwardedRef)=>{
    const { pressed: pressedProp , defaultPressed: defaultPressed = false , onPressedChange: onPressedChange , ...buttonProps } = props;
    const [pressed = false, setPressed] = $5AXX7$useControllableState({
        prop: pressedProp,
        onChange: onPressedChange,
        defaultProp: defaultPressed
    });
    return /*#__PURE__*/ $5AXX7$createElement($5AXX7$Primitive.button, $5AXX7$babelruntimehelpersesmextends({
        type: "button",
        "aria-pressed": pressed,
        "data-state": pressed ? 'on' : 'off',
        "data-disabled": props.disabled ? '' : undefined
    }, buttonProps, {
        ref: forwardedRef,
        onClick: $5AXX7$composeEventHandlers(props.onClick, ()=>{
            if (!props.disabled) setPressed(!pressed);
        })
    }));
});
/*#__PURE__*/ Object.assign($b3bbe2732c13b576$export$bea8ebba691c5813, {
    displayName: $b3bbe2732c13b576$var$NAME
});
/* ---------------------------------------------------------------------------------------------- */ const $b3bbe2732c13b576$export$be92b6f5f03c0fe9 = $b3bbe2732c13b576$export$bea8ebba691c5813;




export {$b3bbe2732c13b576$export$bea8ebba691c5813 as Toggle, $b3bbe2732c13b576$export$be92b6f5f03c0fe9 as Root};
//# sourceMappingURL=index.module.js.map
