import React, { useEffect, useState } from 'react';
import { Titlebar, Color } from 'custom-electron-titlebar';
import { useSelector } from 'react-redux';
import { AppState } from '../store/app/reducer';
import { ReduxStore } from '../store';
import os from 'os';

const appTitle = new Titlebar({
  backgroundColor: Color.fromHex('#181818'),
  menu: null,
});

export default function Title(): JSX.Element {
  const { title } = useSelector<ReduxStore, AppState>((states) => states.app);

  useEffect(() => {
    const nets = os.networkInterfaces();
    let ip = null;
    Object.keys(nets).forEach((k) => {
      nets[k].forEach((n) => {
        if (n.family === 'IPv4' && !n.internal) ip = n.address;
      });
    });

    const t =
      (!!title &&
        title.trim() !== '' &&
        `${title} - Trắc nghiệm trực tuyến DNC - ${os.hostname()} ${
          ip ? `[${ip}]` : ''
        }`) ||
      `Trắc nghiệm trực tuyến DNC - ${os.hostname()} ${ip ? `[${ip}]` : ''}`;
    document.title = t;
    appTitle.updateTitle(t);
  }, [title]);

  return <></>;
}
