import React from "react";
import * as Radix from "@radix-ui/react-primitive";
import { Primitive } from "@radix-ui/react-primitive";
import * as RovingFocusGroup from "@radix-ui/react-roving-focus";
import { Toggle } from "@radix-ui/react-toggle";
export const createToggleGroupScope: import("@radix-ui/react-context").CreateScope;
export interface ToggleGroupSingleProps extends ToggleGroupImplSingleProps {
    type: 'single';
}
export interface ToggleGroupMultipleProps extends ToggleGroupImplMultipleProps {
    type: 'multiple';
}
export const ToggleGroup: React.ForwardRefExoticComponent<(ToggleGroupSingleProps | ToggleGroupMultipleProps) & React.RefAttributes<HTMLDivElement>>;
interface ToggleGroupImplSingleProps extends ToggleGroupImplProps {
    /**
     * The controlled stateful value of the item that is pressed.
     */
    value?: string;
    /**
     * The value of the item that is pressed when initially rendered. Use
     * `defaultValue` if you do not need to control the state of a toggle group.
     */
    defaultValue?: string;
    /**
     * The callback that fires when the value of the toggle group changes.
     */
    onValueChange?(value: string): void;
}
interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
    /**
     * The controlled stateful value of the items that are pressed.
     */
    value?: string[];
    /**
     * The value of the items that are pressed when initially rendered. Use
     * `defaultValue` if you do not need to control the state of a toggle group.
     */
    defaultValue?: string[];
    /**
     * The callback that fires when the state of the toggle group changes.
     */
    onValueChange?(value: string[]): void;
}
type RovingFocusGroupProps = Radix.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
interface ToggleGroupImplProps extends PrimitiveDivProps {
    /**
     * Whether the group is disabled from user interaction.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the group should maintain roving focus of its buttons.
     * @defaultValue true
     */
    rovingFocus?: boolean;
    loop?: RovingFocusGroupProps['loop'];
    orientation?: RovingFocusGroupProps['orientation'];
    dir?: RovingFocusGroupProps['dir'];
}
export interface ToggleGroupItemProps extends Omit<ToggleGroupItemImplProps, 'pressed'> {
}
export const ToggleGroupItem: React.ForwardRefExoticComponent<ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
type ToggleProps = Radix.ComponentPropsWithoutRef<typeof Toggle>;
interface ToggleGroupItemImplProps extends Omit<ToggleProps, 'defaultPressed' | 'onPressedChange'> {
    /**
     * A string value for the toggle group item. All items within a toggle group should use a unique value.
     */
    value: string;
}
export const Root: React.ForwardRefExoticComponent<(ToggleGroupSingleProps | ToggleGroupMultipleProps) & React.RefAttributes<HTMLDivElement>>;
export const Item: React.ForwardRefExoticComponent<ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>>;

//# sourceMappingURL=index.d.ts.map
