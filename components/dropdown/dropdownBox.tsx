import { useState } from 'react';
import styles from './dropdownBox.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  dropdownMenus: React.ReactNode[];
};

export default function DropdownBox(props: ContainerProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  return (
    <div
      className={styles.dropdown}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {props.children}
      <div
        className={`${styles.dropdownMenus}  ${
          isMouseOver ? styles.mouseOn : styles.mouseOut
        }`}
      >
        {props.dropdownMenus.map((element) => {
          return element;
        })}
      </div>
    </div>
  );
}
