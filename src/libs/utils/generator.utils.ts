import { PID } from '../models';

export class Generator {
  private static idIndex = 1000;
  public static getId(pref: string = ''): PID {
    return pref + Date.now().toString(16) + (this.idIndex++).toString(16);
  }
}
