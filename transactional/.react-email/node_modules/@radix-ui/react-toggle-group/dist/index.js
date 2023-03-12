var $1z6X1$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $1z6X1$react = require("react");
var $1z6X1$radixuireactcontext = require("@radix-ui/react-context");
var $1z6X1$radixuireactprimitive = require("@radix-ui/react-primitive");
var $1z6X1$radixuireactrovingfocus = require("@radix-ui/react-roving-focus");
var $1z6X1$radixuireacttoggle = require("@radix-ui/react-toggle");
var $1z6X1$radixuireactusecontrollablestate = require("@radix-ui/react-use-controllable-state");
var $1z6X1$radixuireactdirection = require("@radix-ui/react-direction");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "createToggleGroupScope", () => $14b404ddd46c8376$export$d1c7c4bcd9f26dd4);
$parcel$export(module.exports, "ToggleGroup", () => $14b404ddd46c8376$export$af3ec21f6cfb5e30);
$parcel$export(module.exports, "ToggleGroupItem", () => $14b404ddd46c8376$export$b453109e13abe10b);
$parcel$export(module.exports, "Root", () => $14b404ddd46c8376$export$be92b6f5f03c0fe9);
$parcel$export(module.exports, "Item", () => $14b404ddd46c8376$export$6d08773d2e66f8f2);









/* -------------------------------------------------------------------------------------------------
 * ToggleGroup
 * -----------------------------------------------------------------------------------------------*/ const $14b404ddd46c8376$var$TOGGLE_GROUP_NAME = 'ToggleGroup';
const [$14b404ddd46c8376$var$createToggleGroupContext, $14b404ddd46c8376$export$d1c7c4bcd9f26dd4] = $1z6X1$radixuireactcontext.createContextScope($14b404ddd46c8376$var$TOGGLE_GROUP_NAME, [
    $1z6X1$radixuireactrovingfocus.createRovingFocusGroupScope
]);
const $14b404ddd46c8376$var$useRovingFocusGroupScope = $1z6X1$radixuireactrovingfocus.createRovingFocusGroupScope();
const $14b404ddd46c8376$export$af3ec21f6cfb5e30 = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const { type: type , ...toggleGroupProps } = props;
    if (type === 'single') {
        const singleProps = toggleGroupProps;
        return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupImplSingle, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, singleProps, {
            ref: forwardedRef
        }));
    }
    if (type === 'multiple') {
        const multipleProps = toggleGroupProps;
        return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupImplMultiple, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, multipleProps, {
            ref: forwardedRef
        }));
    }
    throw new Error(`Missing prop \`type\` expected on \`${$14b404ddd46c8376$var$TOGGLE_GROUP_NAME}\``);
});
/*#__PURE__*/ Object.assign($14b404ddd46c8376$export$af3ec21f6cfb5e30, {
    displayName: $14b404ddd46c8376$var$TOGGLE_GROUP_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const [$14b404ddd46c8376$var$ToggleGroupValueProvider, $14b404ddd46c8376$var$useToggleGroupValueContext] = $14b404ddd46c8376$var$createToggleGroupContext($14b404ddd46c8376$var$TOGGLE_GROUP_NAME);
const $14b404ddd46c8376$var$ToggleGroupImplSingle = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...toggleGroupSingleProps } = props;
    const [value, setValue] = $1z6X1$radixuireactusecontrollablestate.useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupValueProvider, {
        scope: props.__scopeToggleGroup,
        type: "single",
        value: value ? [
            value
        ] : [],
        onItemActivate: setValue,
        onItemDeactivate: ($parcel$interopDefault($1z6X1$react)).useCallback(()=>setValue('')
        , [
            setValue
        ])
    }, /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupImpl, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, toggleGroupSingleProps, {
        ref: forwardedRef
    })));
});
const $14b404ddd46c8376$var$ToggleGroupImplMultiple = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...toggleGroupMultipleProps } = props;
    const [value1 = [], setValue] = $1z6X1$radixuireactusecontrollablestate.useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    const handleButtonActivate = ($parcel$interopDefault($1z6X1$react)).useCallback((itemValue)=>setValue((prevValue = [])=>[
                ...prevValue,
                itemValue
            ]
        )
    , [
        setValue
    ]);
    const handleButtonDeactivate = ($parcel$interopDefault($1z6X1$react)).useCallback((itemValue)=>setValue((prevValue = [])=>prevValue.filter((value)=>value !== itemValue
            )
        )
    , [
        setValue
    ]);
    return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupValueProvider, {
        scope: props.__scopeToggleGroup,
        type: "multiple",
        value: value1,
        onItemActivate: handleButtonActivate,
        onItemDeactivate: handleButtonDeactivate
    }, /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupImpl, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, toggleGroupMultipleProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($14b404ddd46c8376$export$af3ec21f6cfb5e30, {
    displayName: $14b404ddd46c8376$var$TOGGLE_GROUP_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const [$14b404ddd46c8376$var$ToggleGroupContext, $14b404ddd46c8376$var$useToggleGroupContext] = $14b404ddd46c8376$var$createToggleGroupContext($14b404ddd46c8376$var$TOGGLE_GROUP_NAME);
const $14b404ddd46c8376$var$ToggleGroupImpl = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeToggleGroup: __scopeToggleGroup , disabled: disabled = false , rovingFocus: rovingFocus = true , orientation: orientation , dir: dir , loop: loop = true , ...toggleGroupProps } = props;
    const rovingFocusGroupScope = $14b404ddd46c8376$var$useRovingFocusGroupScope(__scopeToggleGroup);
    const direction = $1z6X1$radixuireactdirection.useDirection(dir);
    const commonProps = {
        role: 'group',
        dir: direction,
        ...toggleGroupProps
    };
    return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupContext, {
        scope: __scopeToggleGroup,
        rovingFocus: rovingFocus,
        disabled: disabled
    }, rovingFocus ? /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($1z6X1$radixuireactrovingfocus.Root, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({
        asChild: true
    }, rovingFocusGroupScope, {
        orientation: orientation,
        dir: direction,
        loop: loop
    }), /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($1z6X1$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef
    }))) : /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($1z6X1$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef
    })));
});
/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItem
 * -----------------------------------------------------------------------------------------------*/ const $14b404ddd46c8376$var$ITEM_NAME = 'ToggleGroupItem';
const $14b404ddd46c8376$export$b453109e13abe10b = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const valueContext = $14b404ddd46c8376$var$useToggleGroupValueContext($14b404ddd46c8376$var$ITEM_NAME, props.__scopeToggleGroup);
    const context = $14b404ddd46c8376$var$useToggleGroupContext($14b404ddd46c8376$var$ITEM_NAME, props.__scopeToggleGroup);
    const rovingFocusGroupScope = $14b404ddd46c8376$var$useRovingFocusGroupScope(props.__scopeToggleGroup);
    const pressed = valueContext.value.includes(props.value);
    const disabled = context.disabled || props.disabled;
    const commonProps = {
        ...props,
        pressed: pressed,
        disabled: disabled
    };
    const ref = ($parcel$interopDefault($1z6X1$react)).useRef(null);
    return context.rovingFocus ? /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($1z6X1$radixuireactrovingfocus.Item, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({
        asChild: true
    }, rovingFocusGroupScope, {
        focusable: !disabled,
        active: pressed,
        ref: ref
    }), /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupItemImpl, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef
    }))) : /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($14b404ddd46c8376$var$ToggleGroupItemImpl, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, commonProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($14b404ddd46c8376$export$b453109e13abe10b, {
    displayName: $14b404ddd46c8376$var$ITEM_NAME
});
/* -----------------------------------------------------------------------------------------------*/ const $14b404ddd46c8376$var$ToggleGroupItemImpl = /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeToggleGroup: __scopeToggleGroup , value: value , ...itemProps } = props;
    const valueContext = $14b404ddd46c8376$var$useToggleGroupValueContext($14b404ddd46c8376$var$ITEM_NAME, __scopeToggleGroup);
    const singleProps = {
        role: 'radio',
        'aria-checked': props.pressed,
        'aria-pressed': undefined
    };
    const typeProps = valueContext.type === 'single' ? singleProps : undefined;
    return /*#__PURE__*/ ($parcel$interopDefault($1z6X1$react)).createElement($1z6X1$radixuireacttoggle.Toggle, ($parcel$interopDefault($1z6X1$babelruntimehelpersextends))({}, typeProps, itemProps, {
        ref: forwardedRef,
        onPressedChange: (pressed)=>{
            if (pressed) valueContext.onItemActivate(value);
            else valueContext.onItemDeactivate(value);
        }
    }));
});
/* -----------------------------------------------------------------------------------------------*/ const $14b404ddd46c8376$export$be92b6f5f03c0fe9 = $14b404ddd46c8376$export$af3ec21f6cfb5e30;
const $14b404ddd46c8376$export$6d08773d2e66f8f2 = $14b404ddd46c8376$export$b453109e13abe10b;




//# sourceMappingURL=index.js.map
