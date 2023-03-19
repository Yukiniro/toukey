type ToukeyOptions = {
  scope?: string;
  splitValue?: string;
  keydown?: boolean;
  keyup?: boolean;
};

type ToukeyHandler = (e: KeyboardEvent) => void;

export { ToukeyOptions, ToukeyHandler };
