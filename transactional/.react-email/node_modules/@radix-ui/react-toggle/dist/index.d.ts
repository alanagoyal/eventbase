import * as React from "react";
import * as Radix from "@radix-ui/react-primitive";
import { Primitive } from "@radix-ui/react-primitive";
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
export interface ToggleProps extends PrimitiveButtonProps {
    /**
     * The controlled state of the toggle.
     */
    pressed?: boolean;
    /**
     * The state of the toggle when initially rendered. Use `defaultPressed`
     * if you do not need to control the state of the toggle.
     * @defaultValue false
     */
    defaultPressed?: boolean;
    /**
     * The callback that fires when the state of the toggle changes.
     */
    onPressedChange?(pressed: boolean): void;
}
export const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
export const Root: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;

//# sourceMappingURL=index.d.ts.map
