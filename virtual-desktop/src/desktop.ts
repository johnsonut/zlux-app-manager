

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

/*
 * This is the entry point for bootstrapping the desktop Angular application.
 * To set up the desktop, this file must provide a public path for CSS
 * resources, load any external/global stylesheets and scripts, prepare the DOM
 * for the Angular application, and bootstrap the application. The core MVD
 * implementation exists at window.ZoweZLUX.
 */


/* Establish our public path before loading CSS resources */
// @ts-ignore
declare let __webpack_public_path__: string;
const uriBroker = (window as any).ZoweZLUX.uriBroker;
__webpack_public_path__ = uriBroker.desktopRootUri();

/* Load external/global resources */
import './include.ts';

/* Standard Angular bootstrap */
import { enableProdMode, Type } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MvdComponent } from 'app/window-manager/mvd-window-manager/mvd.component';

import { MvdModuleFactory } from './app/mvd-module-factory';
import { SimpleWindowManagerModule } from './app/window-manager/simple-window-manager/simple-window-manager.module';
import { environment } from './environments/environment';
import { WindowManagerModule } from 'app/window-manager/mvd-window-manager/window-manager.module';
import { SimpleComponent } from 'app/window-manager/simple-window-manager/simple.component';

if (environment.production) {
  enableProdMode();
}

let mainModule: Type<any>;
if ((window as any)['GIZA_SIMPLE_CONTAINER_REQUESTED']) {
  mainModule = MvdModuleFactory.generateModule(SimpleWindowManagerModule, SimpleComponent);
} else {
  mainModule = MvdModuleFactory.generateModule(WindowManagerModule, MvdComponent);
}

export function performBootstrap(): void {
  platformBrowserDynamic().bootstrapModule(mainModule);
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

