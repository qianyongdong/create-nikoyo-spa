import { registerApplication, start } from "single-spa";

// 布局应用 常驻
export const layoutApps = {
  navbar: "@test/app-navbar",
};

// 布局子应用
export const apps = {
  test: "@test/app-test",
};

// 外部应用
export const outsideApps = {
  auth: "@test/app-auth",
};

// 验证是否是布局路径
export function validLayoutPath(locationPath: string) {
  console.log("validLayoutPath", locationPath);
  for (const layoutAppName of Object.keys(apps)) {
    const pathname = `/${layoutAppName}`;
    const pathnameWithSlash = `${pathname}/`;
    if (
      locationPath === pathname ||
      locationPath.startsWith(pathnameWithSlash)
    ) {
      return true;
    }
  }
  return false;
}

function registerLayoutApps() {
  for (const [route, moduleName] of Object.entries(layoutApps)) {
    registerApplication({
      name: route,
      app: () => import(/* @vite-ignore */ moduleName),
      // activeWhen: () => true,
      activeWhen: (locationPath) => {
        return validLayoutPath(locationPath.pathname);
      },
      customProps: {
        basePath: `/`,
      },
    });
  }
}

function registerApps() {
  for (const [route, moduleName] of Object.entries({
    ...apps,
    ...outsideApps,
  })) {
    registerApplication({
      name: route,
      app: () => import(/* @vite-ignore */ moduleName),
      activeWhen: `/${route}`,
      customProps: {
        basePath: `/${route}`,
      },
    });
  }
}

export function registerSpas() {
  registerLayoutApps();
  registerApps();
  runSpas();
}

export function runSpas() {
  start();
}
