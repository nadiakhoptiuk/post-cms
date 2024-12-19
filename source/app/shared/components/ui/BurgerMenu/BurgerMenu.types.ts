export type TBurgerMenu = {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
  hiddenFrom?: string;
};
