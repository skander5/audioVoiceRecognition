import * as React from 'react';

import './navbar.css';

export interface ISpbNavbarItem {
  url: string;
  icone: string;
  label: string;
}

export interface ISpbNavbar {
  visible?: boolean;
  items: ISpbNavbarItem[];
  sidNavData: any;
  selectItem?: (value: ISpbNavbarItem) => void;
}

export const SpbNavbar = (): JSX.Element => {

  const isActiveItems = (url:any): string => {
    if (typeof window !== 'undefined') return window.location.pathname.includes(url) && url !== '/' ? 'active' : '';
    else return '';
  };




    return (
      <div className="s-layout">
        <div className="s-sidebar__trigger">
          <img className={'icone-menu'} alt="Logo utilisateur"  src={""}/>
          <img className={'log-img'} alt="Logo utilisateur" src={""} />
        </div>
        <nav className="s-sidebar__nav">
          <ul>

              return (
                <React.Fragment key={'s-sidebar'}>
                  <li className={isActiveItems("")}>
                    <a className={'s-sidebar__nav-link '}>
                      <img src={""} alt={""} />
                      {"IMG"}
                    </a>
                  </li>
                </React.Fragment>
              );

          </ul>
          <img className={'small-icon-menu-bottom'} alt="Logo utilisateur" src={""} />
          <img className={'icon-menu-bottom'} alt="Logo utilisateur"  src={""} />
        </nav>
      </div>
    );
};
