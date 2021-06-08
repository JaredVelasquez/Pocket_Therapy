import {BindingScope, injectable} from '@loopback/core';


@injectable({scope: BindingScope.TRANSIENT})
export class ConfigFile {
  async CleanImageIdentificator(identificator: string) {
    identificator = identificator.replace('.jpg', '');
    identificator = identificator.replace('.jpeg', '');
    identificator = identificator.replace('.png', '');
    identificator = identificator.replace('.svg', '');

    return identificator;
  }
}
