import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ButtonProps {
    title: string;
    value: string;
    children: string;
    isSelected: boolean;
 }

export function Button(props: ButtonProps) {
    return (
        <ToggleGroup.Item
            title={props.title}
            value={props.value}
            children={props.children}
            className={`w-10 h-10 rounded ${props.isSelected ? 'bg-violet-500' : 'bg-zinc-900'}`}
        />
    )
}