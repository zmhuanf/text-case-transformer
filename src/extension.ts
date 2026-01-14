import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    /**
     * 将任意格式的字符串解析为单词数组
     */
    const parseWords = (text: string): string[] => {
        return text
            // 1. 处理驼峰：在小写字母和大写字母之间加空格 (camelCase -> camel Case)
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            // 2. 处理连续大写：(XMLHttp -> XML Http)
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
            // 3. 将非字母数字字符（如下划线、中划线）替换为空格
            .replace(/[^a-zA-Z0-9]+/g, ' ')
            // 4. 去除首尾空格
            .trim()
            // 5. 按空格分割
            .split(/\s+/)
            // 6. 过滤空字符串
            .filter(w => w.length > 0);
    };

    /**
     * 通用的命令处理函数
     * @param commandName package.json 中定义的命令 ID
     * @param transformFn 具体的转换逻辑函数
     */
    const registerTransform = (commandName: string, transformFn: (words: string[]) => string) => {
        const disposable = vscode.commands.registerCommand(commandName, () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return; }

            const document = editor.document;
            const selections = editor.selections;

            // 批量替换所有选区
            editor.edit(editBuilder => {
                selections.forEach(selection => {
                    const text = document.getText(selection);
                    // 如果没有选中文本
                    if (!text) { return; }

                    const words = parseWords(text);
                    if (words.length === 0) { return; }

                    // 执行转换
                    const newText = transformFn(words);
                    
                    // 替换文本
                    editBuilder.replace(selection, newText);
                });
            });
        });
        context.subscriptions.push(disposable);
    };

    // --- 1. Camel Case (helloWorld) ---
    registerTransform('text-case-transformer.camelCase', (words) => {
        return words.map((word, index) => {
            // 第一个单词全小写
            if (index === 0) {
                return word.toLowerCase();
            }
            // 后面的单词首字母大写，其余小写
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    });

    // --- 2. Pascal Case (HelloWorld) ---
    registerTransform('text-case-transformer.pascalCase', (words) => {
        return words.map(word => {
            // 所有单词首字母大写
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    });

    // --- 3. Snake Case (hello_world) ---
    registerTransform('text-case-transformer.snakeCase', (words) => {
        // 所有单词小写，用下划线连接
        return words.map(word => word.toLowerCase()).join('_');
    });

    // --- 4. Upper Snake Case (Hello_world) ---
    registerTransform('text-case-transformer.upperSnakeCase', (words) => {
        // 先转成全小写的蛇形
        const snake = words.map(word => word.toLowerCase()).join('_');
        // 然后将整个字符串的第一个字母大写
        return snake.charAt(0).toUpperCase() + snake.slice(1);
    });
}

export function deactivate() {}