# Text Case Transformer

一个 VS Code 扩展，用于快速转换文本的大小写格式。

## 功能

该扩展支持以下四种文本格式转换：

### 1. Camel Case (驼峰命名)
- **格式**: `helloWorld`
- **说明**: 第一个单词全小写，后续单词首字母大写，其余小写
- **示例**: `hello world` → `helloWorld`

### 2. Pascal Case (帕斯卡命名)
- **格式**: `HelloWorld`
- **说明**: 所有单词首字母大写，其余小写
- **示例**: `hello world` → `HelloWorld`

### 3. Snake Case (蛇形命名)
- **格式**: `hello_world`
- **说明**: 所有单词小写，用下划线连接
- **示例**: `hello world` → `hello_world`

### 4. Upper Snake Case (首字母大写的蛇形命名)
- **格式**: `Hello_world`
- **说明**: 蛇形命名，但第一个字母大写
- **示例**: `hello world` → `Hello_world`

## 使用方法

### 快捷键

在编辑器中选中需要转换的文本后，使用以下快捷键：

| 转换类型 | Windows/Linux | macOS |
|---------|--------------|-------|
| Camel Case | `Ctrl + NumPad 1` | `Cmd + NumPad 1` |
| Pascal Case | `Ctrl + NumPad 2` | `Cmd + NumPad 2` |
| Snake Case | `Ctrl + NumPad 4` | `Cmd + NumPad 4` |
| Upper Snake Case | `Ctrl + NumPad 5` | `Cmd + NumPad 5` |
