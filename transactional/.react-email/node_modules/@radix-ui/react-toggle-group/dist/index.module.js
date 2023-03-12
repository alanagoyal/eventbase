import $jFibJ$babelruntimehelpersesmextends from "@babel/runtime/helpers/esm/extends";
import $jFibJ$react from "react";
import {createContextScope as $jFibJ$createContextScope} from "@radix-ui/react-context";
import {Primitive as $jFibJ$Primitive} from "@radix-ui/react-primitive";
import {createRovingFocusGroupScope as $jFibJ$createRovingFocusGroupScope, Root as $jFibJ$Root, Item as $jFibJ$Item} from "@radix-ui/react-roving-focus";
import {Toggle as $jFibJ$Toggle} from "@radix-ui/react-toggle";
import {useControllableState as $jFibJ$useControllableState} from "@radix-ui/react-use-controllable-state";
import {useDirection as $jFibJ$useDirection} from "@radix-ui/react-direction";










/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/ const $6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME = 'ToggleGroup';
const [$6c1fd9e6a8969628$var$createToggleGroupContext, $6c1fd9e6a8969628$export$d1c7c4bcd9f26dd4] = $jFibJ$createContextScope($6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME, [
    $jFibJ$createRovingFocusGroupScope
]);
const $6c1fd9e6a8969628$var$useRovingFocusGroupScope = $jFibJ$createRovingFocusGroupScope();
const $6c1fd9e6a8969628$export$af3ec21f6cfb5e30 = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const { type: type , ...toggleGroupProps } = props;
    if (type === 'single') {
        const singleProps = toggleGroupProps;
        return /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupImplSingle, $jFibJ$babelruntimehelpersesmextends({}, singleProps, {
            ref: forwardedRef
        }));
    }
    if (type === 'multiple') {
        const multipleProps = toggleGroupProps;
        return /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupImplMultiple, $jFibJ$babelruntimehelpersesmextends({}, multipleProps, {
            ref: forwardedRef
        }));
    }
    throw new Error(`Missing prop \`type\` expected on \`${$6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME}\``);
});
/*#__PURE__*/ Object.assign($6c1fd9e6a8969628$export$af3ec21f6cfb5e30, {
    displayName: $6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const [$6c1fd9e6a8969628$var$ToggleGroupValueProvider, $6c1fd9e6a8969628$var$useToggleGroupValueContext] = $6c1fd9e6a8969628$var$createToggleGroupContext($6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME);
const $6c1fd9e6a8969628$var$ToggleGroupImplSingle = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...toggleGroupSingleProps } = props;
    const [value, setValue] = $jFibJ$useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    return /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupValueProvider, {
        scope: props.__scopeToggleGroup,
        type: "single",
        value: value ? [
            value
        ] : [],
        onItemActivate: setValue,
        onItemDeactivate: $jFibJ$react.useCallback(()=>setValue('')
        , [
            setValue
        ])
    }, /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupImpl, $jFibJ$babelruntimehelpersesmextends({}, toggleGroupSingleProps, {
        ref: forwardedRef
    })));
});
const $6c1fd9e6a8969628$var$ToggleGroupImplMultiple = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...toggleGroupMultipleProps } = props;
    const [value1 = [], setValue] = $jFibJ$useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    const handleButtonActivate = $jFibJ$react.useCallback((itemValue)=>setValue((prevValue = [])=>[
                ...prevValue,
                itemValue
            ]
        )
    , [
        setValue
    ]);
    const handleButtonDeactivate = $jFibJ$react.useCallback((itemValue)=>setValue((prevValue = [])=>prevValue.filter((value)=>value !== itemValue
            )
        )
    , [
        setValue
    ]);
    return /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupValueProvider, {
        scope: props.__scopeToggleGroup,
        type: "multiple",
        value: value1,
        onItemActivate: handleButtonActivate,
        onItemDeactivate: handleButtonDeactivate
    }, /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupImpl, $jFibJ$babelruntimehelpersesmextends({}, toggleGroupMultipleProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($6c1fd9e6a8969628$export$af3ec21f6cfb5e30, {
    displayName: $6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const [$6c1fd9e6a8969628$var$ToggleGroupContext, $6c1fd9e6a8969628$var$useToggleGroupContext] = $6c1fd9e6a8969628$var$createToggleGroupContext($6c1fd9e6a8969628$var$TOGGLE_GROUP_NAME);
const $6c1fd9e6a8969628$var$ToggleGroupImpl = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const { __scopeToggleGroup: __scopeToggleGroup , disabled: disabled = false , rovingFocus: rovingFocus = true , orientation: orientation , dir: dir , loop: loop = true , ...toggleGroupProps } = props;
    const rovingFocusGroupScope = $6c1fd9e6a8969628$var$useRovingFocusGroupScope(__scopeToggleGroup);
    const direction = $jFibJ$useDirection(dir);
    const commonProps = {
        role: 'group',
        dir: direction,
        ...toggleGroupProps
    };
    return /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupContext, {
        scope: __scopeToggleGroup,
        rovingFocus: rovingFocus,
        disabled: disabled
    }, rovingFocus ? /*#__PURE__*/ $jFibJ$react.createElement($jFibJ$Root, $jFibJ$babelruntimehelpersesmextends({
        asChild: true
    }, rovingFocusGroupScope, {
        orientation: orientation,
        dir: direction,
        loop: loop
    }), /*#__PURE__*/ $jFibJ$react.createElement($jFibJ$Primitive.div, $jFibJ$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef
    }))) : /*#__PURE__*/ $jFibJ$react.createElement($jFibJ$Primitive.div, $jFibJ$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef
    })));
});
/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItem
 * -----------------------------------------------------------------------------------------------*/ const $6c1fd9e6a8969628$var$ITEM_NAME = 'ToggleGroupItem';
const $6c1fd9e6a8969628$export$b453109e13abe10b = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const valueContext = $6c1fd9e6a8969628$var$useToggleGroupValueContext($6c1fd9e6a8969628$var$ITEM_NAME, props.__scopeToggleGroup);
    const context = $6c1fd9e6a8969628$var$useToggleGroupContext($6c1fd9e6a8969628$var$ITEM_NAME, props.__scopeToggleGroup);
    const rovingFocusGroupScope = $6c1fd9e6a8969628$var$useRovingFocusGroupScope(props.__scopeToggleGroup);
    const pressed = valueContext.value.includes(props.value);
    const disabled = context.disabled || props.disabled;
    const commonProps = {
        ...props,
        pressed: pressed,
        disabled: disabled
    };
    const ref = $jFibJ$react.useRef(null);
    return context.rovingFocus ? /*#__PURE__*/ $jFibJ$react.createElement($jFibJ$Item, $jFibJ$babelruntimehelpersesmextends({
        asChild: true
    }, rovingFocusGroupScope, {
        focusable: !disabled,
        active: pressed,
        ref: ref
    }), /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupItemImpl, $jFibJ$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef
    }))) : /*#__PURE__*/ $jFibJ$react.createElement($6c1fd9e6a8969628$var$ToggleGroupItemImpl, $jFibJ$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($6c1fd9e6a8969628$export$b453109e13abe10b, {
    displayName: $6c1fd9e6a8969628$var$ITEM_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $6c1fd9e6a8969628$var$ToggleGroupItemImpl = /*#__PURE__*/ $jFibJ$react.forwardRef((props, forwardedRef)=>{
    const { __scopeToggleGroup: __scopeToggleGroup , value: value , ...itemProps } = props;
    const valueContext = $6c1fd9e6a8969628$var$useToggleGroupValueContext($6c1fd9e6a8969628$var$ITEM_NAME, __scopeToggleGroup);
    const singleProps = {
        role: 'radio',
        'aria-checked': props.pressed,
        'aria-pressed': undefined
    };
    const typeProps = valueContext.type === 'single' ? singleProps : undefined;
    return /*#__PURE__*/ $jFibJ$react.createElement($jFibJ$Toggle, $jFibJ$babelruntimehelpersesmextends({}, typeProps, itemProps, {
        ref: forwardedRef,
        onPressedChange: (pressed)=>{
            if (pressed) valueContext.onItemActivate(value);
            else valueContext.onItemDeactivate(value);
        }
    }));
});
/* -----------------------------------------------------------------------------------------------*/ const $6c1fd9e6a8969628$export$be92b6f5f03c0fe9 = $6c1fd9e6a8969628$export$af3ec21f6cfb5e30;
const $6c1fd9e6a8969628$export$6d08773d2e66f8f2 = $6c1fd9e6a8969628$export$b453109e13abe10b;




export {$6c1fd9e6a8969628$export$d1c7c4bcd9f26dd4 as createToggleGroupScope, $6c1fd9e6a8969628$export$af3ec21f6cfb5e30 as ToggleGroup, $6c1fd9e6a8969628$export$b453109e13abe10b as ToggleGroupItem, $6c1fd9e6a8969628$export$be92b6f5f03c0fe9 as Root, $6c1fd9e6a8969628$export$6d08773d2e66f8f2 as Item};
//# sourceMappingURL=index.module.js.map
