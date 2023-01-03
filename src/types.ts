type ToukeyOptions = {
  scope?: string;
  splitValue?: any;
  keydown?: boolean;
  keyup?: boolean;
};

type ToukeyHandler = (e: KeyboardEvent) => void;

export { ToukeyOptions, ToukeyHandler };
