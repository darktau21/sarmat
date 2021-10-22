# Сайт какого-то музея ЮФУ

## Оглавление

1. [Оглавление](#оглавление)
2. [Используемые средства разработки](#используемые-средства-разработки)

---

## Используемые средства разработки

- [VS Code](https://code.visualstudio.com/ 'Текстовый редактор')
  - [Remote WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl 'Расширение для интеграции WSL в VS Code')
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens 'Расширение, добавляющее новые функции для работы с Git в VS Code')
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode 'Форматирует код, приводя его в надлежащий вид')
- [WSL](https://docs.microsoft.com/ru-ru/windows/wsl/ 'Подсистема Linux для Windows')
  - [Git](https://git-scm.com/ 'Система контроля версий')
  - [NodeJS](https://nodejs.org/ru/ 'Окружение, позволяющее использовать JS вне браузеров')
    - [Gulp](https://gulpjs.com/ 'Таск раннер')
      - [PUG](https://pugjs.org/api/getting-started.html 'HTML препроцессор')
      - [Sass](https://sass-lang.com/ 'CSS препроцессор')
      - [Babel](https://babeljs.io/ 'JS компилятор, обеспечивающий совместимость новых версий ES со старыми браузерами')

## Начало работы

### VS Code

Объяснять, как установить [VS Code](https://code.visualstudio.com/ 'Текстовый редактор') не буду, но пару слов сказать стоит.

Во-первых, расширения, указанные в [используемых средствах разработки](#используемые-средства-разработки) очень желательно установить, все ссылки на них указаны. Вкратце про плагины. [Remote WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl 'Расширение для интеграции WSL в VS Code') необходим для более тесной интеграции [VS Code](https://code.visualstudio.com/ 'Текстовый редактор') в [WSL](https://docs.microsoft.com/ru-ru/windows/wsl/ 'Подсистема Linux для Windows'), например, для открытия линуксовской консоли и работой с файлами прямо в редоакторе. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode 'Форматирует код, приводя его в надлежащий вид') - понятно, приводит говнокод в более-менее читаемый вид. Про работу с [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens 'Расширение, добавляющее новые функции для работы с Git в VS Code') и его функционал расскажу позже.

Во-вторых - папка ".vscode". В ней находятся мои настройки редактора именно для этого проекта. Использовать их необязательно (эту папку можно просто удалить), но как минимум необходимо установить разиер таба в 2 пробела (да, по умолчанию в [VS Code](https://code.visualstudio.com/ 'Текстовый редактор') символ таба заменяется пробелами, это связано с тем, что на разных системах размер таба разный, а пробелы везде одинаковые).

### WSL

[WSL](https://docs.microsoft.com/ru-ru/windows/wsl/ 'Подсистема Linux для Windows') (аббревиатура от Windows Substyem for Linux) - это подсистема, позволяющая запускать среду GNU/Linux и использовать большинство программ доступных в ней прямо из винды.

Установка. Если версия винды 2004 или любая Windows 11 (проверить можно нажав Win + R и введя `winver`), достаточно открыть PowerShell от имени админа, ввести `wsl --install` и перезагрузить компьютер. В противном случае ситуация сложнее. Тут порядок действий следующий:

1. Открываем PowerShell от админа.
2. Вводим `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`
3. Перезагружаемся, снова открываем PowerShell.
4. Вводим `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`
5. Перезагружаемся.
6. [Скачиваем](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi), устанавливаем, перезагружаемся.
7. Снова PowerShell, вводим `wsl --set-default-version 2`
8. [Тык](https://www.microsoft.com/store/productId/9NBLGGH4MSV6), устанавливаем.

Дальнейшие действия одинаковы вне зависимости от способа установки.
