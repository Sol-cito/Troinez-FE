import Link from 'next/link';
import styles from './dropdownMenu.module.scss';
import { useState } from 'react';

type DropdownMenuProps = {
  title: string;
  href: string;
};

export default function DropdownMenu(props: DropdownMenuProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  return (
    <div className={`${isMouseOver ? styles.mouseOn : styles.mouseOut}`}>
      <Link
        className={styles.dropdownMenu}
        href={props.href}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {props.title}
      </Link>
    </div>
  );
}
