export type SocketMessage =
  | {
      content: OperationDirection;
      type: "FocusWindow";
    }
  | {
      content: OperationDirection;
      type: "MoveWindow";
    }
  | {
      content: CycleDirection;
      type: "CycleFocusWindow";
    }
  | {
      content: CycleDirection;
      type: "CycleMoveWindow";
    }
  | {
      content: OperationDirection;
      type: "StackWindow";
    }
  | {
      content: [OperationDirection, Sizing];
      type: "ResizeWindowEdge";
    }
  | {
      content: [Axis, Sizing];
      type: "ResizeWindowAxis";
    }
  | {
      content: undefined;
      type: "UnstackWindow";
    }
  | {
      content: CycleDirection;
      type: "CycleStack";
    }
  | {
      content: number;
      type: "MoveContainerToMonitorNumber";
    }
  | {
      content: number;
      type: "MoveContainerToWorkspaceNumber";
    }
  | {
      content: number;
      type: "SendContainerToMonitorNumber";
    }
  | {
      content: number;
      type: "SendContainerToWorkspaceNumber";
    }
  | {
      content: [number, number];
      type: "SendContainerToMonitorWorkspaceNumber";
    }
  | {
      content: number;
      type: "MoveWorkspaceToMonitorNumber";
    }
  | {
      content: undefined;
      type: "Promote";
    }
  | {
      content: undefined;
      type: "PromoteFocus";
    }
  | {
      content: undefined;
      type: "ToggleFloat";
    }
  | {
      content: undefined;
      type: "ToggleMonocle";
    }
  | {
      content: undefined;
      type: "ToggleMaximize";
    }
  | { content: undefined; type: "ToggleWindowContainerBehaviour" }
  | {
      content: HidingBehaviour;
      type: "WindowHidingBehaviour";
    }
  | { content: undefined; type: "ToggleCrossMonitorMoveBehaviour" }
  | {
      content: MoveBehaviour;
      type: "CrossMonitorMoveBehaviour";
    }
  | {
      content: OperationBehaviour;
      type: "UnmanagedWindowOperationBehaviour";
    }
  | { content: undefined; type: "ManageFocusedWindow" }
  | { content: undefined; type: "UnmanageFocusedWindow" }
  | {
      content: [Sizing, number];
      type: "AdjustContainerPadding";
    }
  | {
      content: [Sizing, number];
      type: "AdjustWorkspacePadding";
    }
  | {
      content: DefaultLayout;
      type: "ChangeLayout";
    }
  | {
      content: string;
      type: "ChangeLayoutCustom";
    }
  | {
      content: Axis;
      type: "FlipLayout";
    }
  | {
      content: [number, number];
      type: "EnsureWorkspaces";
    }
  | { content: undefined; type: "NewWorkspace" }
  | { content: undefined; type: "ToggleTiling" }
  | { content: undefined; type: "Stop" }
  | { content: undefined; type: "TogglePause" }
  | { content: undefined; type: "Retile" }
  | { content: undefined; type: "QuickSave" }
  | { content: undefined; type: "QuickLoad" }
  | {
      content: string;
      type: "Save";
    }
  | {
      content: string;
      type: "Load";
    }
  | {
      content: CycleDirection;
      type: "CycleFocusMonitor";
    }
  | {
      content: CycleDirection;
      type: "CycleFocusWorkspace";
    }
  | {
      content: number;
      type: "FocusMonitorNumber";
    }
  | {
      content: number;
      type: "FocusWorkspaceNumber";
    }
  | {
      content: [number, number];
      type: "FocusMonitorWorkspaceNumber";
    }
  | {
      content: [number, number, number];
      type: "ContainerPadding";
    }
  | {
      content: [number, number, number];
      type: "WorkspacePadding";
    }
  | {
      content: [number, number, boolean];
      type: "WorkspaceTiling";
    }
  | {
      content: [number, number, string];
      type: "WorkspaceName";
    }
  | {
      content: [number, number, DefaultLayout];
      type: "WorkspaceLayout";
    }
  | {
      content: [number, number, string];
      type: "WorkspaceLayoutCustom";
    }
  | {
      content: [number, number, number, DefaultLayout];
      type: "WorkspaceLayoutRule";
    }
  | {
      content: [number, number, number, string];
      type: "WorkspaceLayoutCustomRule";
    }
  | {
      content: [number, number];
      type: "ClearWorkspaceLayoutRules";
    }
  | { content: undefined; type: "ReloadConfiguration" }
  | {
      content: boolean;
      type: "WatchConfiguration";
    }
  | { content: undefined; type: "CompleteConfiguration" }
  | {
      content: boolean;
      type: "ActiveWindowBorder";
    }
  | {
      content: [WindowKind, number, number, number];
      type: "ActiveWindowBorderColour";
    }
  | {
      content: Rect;
      type: "InvisibleBorders";
    }
  | {
      content: Rect;
      type: "WorkAreaOffset";
    }
  | {
      content: number;
      type: "ResizeDelta";
    }
  | {
      content: [ApplicationIdentifier, string, number, number];
      type: "WorkspaceRule";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "FloatRule";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "ManageRule";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "IdentifyObjectNameChangeApplication";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "IdentifyTrayApplication";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "IdentifyLayeredApplication";
    }
  | {
      content: [ApplicationIdentifier, string];
      type: "IdentifyBorderOverflowApplication";
    }
  | {
      content: undefined;
      type: "State";
    }
  | {
      content: StateQuery;
      type: "Query";
    }
  | {
      content: [FocusFollowsMouseImplementation, boolean];
      type: "FocusFollowsMouse";
    }
  | {
      content: FocusFollowsMouseImplementation;
      type: "ToggleFocusFollowsMouse";
    }
  | {
      content: boolean;
      type: "MouseFollowsFocus";
    }
  | { content: undefined; type: "ToggleMouseFollowsFocus" }
  | {
      content: string;
      type: "AddSubscriber";
    }
  | {
      content: string;
      type: "RemoveSubscriber";
    }
  | {
      content: undefined;
      type: "NotificationSchema";
    }
  | {
      content: undefined;
      type: "SocketSchema";
    };

export type OperationDirection = "Left" | "Right" | "Up" | "Down";

export type CycleDirection = "Previous" | "Next";

export type Sizing = "Increase" | "Decrease";

export type Axis = "Horizontal" | "Vertical" | "HorizontalAndVertical";

export type HidingBehaviour = "Hide" | "Minimize";

export type MoveBehaviour = "Swap" | "Insert";

export type OperationBehaviour = "Op" | "NoOp";

export type DefaultLayout =
  | "BSP"
  | "Columns"
  | "Rows"
  | "VerticalStack"
  | "HorizontalStack"
  | "UltrawideVerticalStack";
export type WindowKind = "Single" | "Stack";

export type ApplicationIdentifier = "exe" | "class" | "title";

export type StateQuery =
  | "FocusedMonitorIndex"
  | "FocusedWorkspaceIndex"
  | "FocusedContainerIndex"
  | "FocusedWindowIndex";

export type FocusFollowsMouseImplementation = "Komorebi" | "Windows";

export interface Rect {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export type KomorebiCommandsType = {
  readonly [T in SocketMessage as T["type"]]: T["content"] extends undefined
    ? () => void
    : (args: T["content"]) => void;
};

export type WindowContainerBehaviour = "Create" | "Append";

export interface State {
  border_overflow_identifiers: string[];
  cross_monitor_move_behaviour: MoveBehaviour;
  float_identifiers: string[];
  focus_follows_mouse?: FocusFollowsMouseImplementation | null;
  has_pending_raise_op: boolean;
  invisible_borders: Rect;
  is_paused: boolean;
  layered_whitelist: string[];
  manage_identifiers: string[];
  monitors: RingFor_Monitor;
  mouse_follows_focus: boolean;
  name_change_on_launch_identifiers: string[];
  new_window_behaviour: WindowContainerBehaviour;
  resize_delta: number;
  tray_and_multi_window_identifiers: string[];
  work_area_offset?: Rect | null;
}

export interface RingFor_Monitor {
  elements: Monitor[];
  focused: number;
}

export interface Monitor {
  id: number;
  size: Rect;
  work_area_size: Rect;
  workspace_names: {
    [k: string]: string;
  };
  workspaces: RingFor_Workspace;
}
export interface RingFor_Workspace {
  elements: Workspace[];
  focused: number;
}

export interface Workspace {
  container_padding?: number | null;
  containers: RingFor_Container;
  floating_windows: Window[];
  latest_layout: Rect[];
  layout: Layout;
  layout_flip?: Axis | null;
  layout_rules: [number, Layout][];
  maximized_window?: Window | null;
  maximized_window_restore_idx?: number | null;
  monocle_container?: Container | null;
  monocle_container_restore_idx?: number | null;
  name?: string | null;
  resize_dimensions: (Rect | null)[];
  tile: boolean;
  workspace_padding?: number | null;
}
export interface RingFor_Container {
  elements: Container[];
  focused: number;
}
export interface Container {
  id: string;
  windows: RingFor_Window;
}
export interface RingFor_Window {
  elements: Window[];
  focused: number;
}

export interface Window {
  hwnd: number;
}
export type Layout =
  | {
      Default: DefaultLayout;
    }
  | {
      Custom: CustomLayout;
    };

export type ColumnWidth = {
  WidthPercentage: number;
};
export type ColumnSplitWithCapacity =
  | {
      Horizontal: number;
    }
  | {
      Vertical: number;
    };
export type ColumnSplit = "Horizontal" | "Vertical";

export type Column =
  | {
      column: "Primary";
      configuration: ColumnWidth | null;
    }
  | {
      column: "Secondary";
      configuration: ColumnSplitWithCapacity | null;
    }
  | {
      column: "Tertiary";
      configuration: ColumnSplit;
    };
export type CustomLayout = Column[];

export interface AppConfigs {
  name: string;
  identifier: Identifier;
  float_identifiers?: FloatIdentifier[];
  options?: Option[];
}

export interface FloatIdentifier {
  kind: Kind;
  id: string;
  comment?: string;
}

export type Kind = "class" | "exe" | "title";
export interface Identifier {
  kind: Kind;
  id: string;
}

export type Option =
  | "border_overflow"
  | "force"
  | "layered"
  | "object_name_change"
  | "tray_and_multi_window";
