import React, { useEffect } from 'react';
import { Titlebar, Color } from 'custom-electron-titlebar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/app/reducer';
import { Store } from '../store';

new Titlebar({
  backgroundColor: Color.fromHex('#333333'),
  menu: null,
});

export default function Title(): JSX.Element {
  const { title } = useSelector<Store, AppState>((states) => states.app);

  useEffect(() => {
    document.title =
      (!!title &&
        title.trim() !== '' &&
        `${title} - Trắc nghiệm trực tuyến DNC - Quản trị viên`) ||
      'Trắc nghiệm trực tuyến DNC - Quản trị viên';
  }, [title]);

  return <></>;
}
