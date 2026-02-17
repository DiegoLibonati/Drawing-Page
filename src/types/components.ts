export interface Component {
  cleanup?: () => void;
}

export interface ButtonComponent extends Component, HTMLButtonElement {}
export interface ToolboxComponent extends Component, HTMLDivElement {}
