import React, { useEffect } from 'react';
import { Titlebar, Color } from 'custom-electron-titlebar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/app/reducer';
import { ReduxStore } from '../store';

const appTitle = new Titlebar({
  backgroundColor: Color.fromHex('#181818'),
  menu: null,
});

export default function Title(): JSX.Element {
  const { title } = useSelector<ReduxStore, AppState>((states) => states.app);

  useEffect(() => {
    const t =
      (!!title &&
        title.trim() !== '' &&
        `${title} - Trắc nghiệm trực tuyến DNC`) ||
      'Trắc nghiệm trực tuyến DNC';
    document.title = t;
    appTitle.updateTitle(t);
  }, [title]);

  return <></>;
}
