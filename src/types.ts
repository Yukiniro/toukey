type ToukeyOptions = {
  scope?: string;
  splitValue?: string;
  keydown?: boolean;
  keyup?: boolean;
  once?: boolean;
};

type ToukeyOffOptions = {
  scope?: string;
  splitValue?: string;
  keydown?: boolean;
  keyup?: boolean;
};

type ToukeyHandler = (e: KeyboardEvent) => void;

type ToukeyItem = {
  handler: ToukeyHandler;
  key: string;
  splitValue: string;
  keydown: boolean;
  keyup: boolean;
  once: boolean;
};

export { ToukeyOptions, ToukeyHandler, ToukeyItem, ToukeyOffOptions };
