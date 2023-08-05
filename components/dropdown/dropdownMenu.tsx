import { useState } from 'react';
import Link from 'next/link';
import styles from './dropdownMenu.module.scss';

type DropdownMenuProps = {
  title: string;
  href: string;
};

export default function DropdownMenu(props: DropdownMenuProps) {
  const { title, href } = props;
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
        href={href}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {title}
      </Link>
    </div>
  );
}
