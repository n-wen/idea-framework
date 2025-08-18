# Create Boundary Context Task

## Purpose

根据用户提供的目标界限上下文，结合ddd.md的设计文档，创建一个符合`Context Task Template`的任务文件。这个命令确保任务文件包含所有必要的技术上下文、需求和验收标准，使得开发者代理能够以最小的额外研究或寻找上下文的需求，高效实现任务。

## SEQUENTIAL Task Execution (Do not proceed until current Task is complete)

### 1. Identify Target Boundary Context for Preparation

#### 1.1 Locate DDD doc and Review Existing Context

- locate context task files in `docs/tasks` folder
- 如果用户没有提供具体的目标上下文， 那么列举当前已经有的任务列表， 然后终止
- 如果用户提供了目标上下文
  - 如果目标上下文已经在`docs/tasks`中， 那么提示用户该上下文已经存在， 然后终止
  - 如果目标上下文不在`docs/tasks`中，那么继续下面的步骤


### 2. 收集上下文相关的文档

- `docs/prd.md`
- `docs/ddd.md`
- `docs/project-info.md`

### 3. 收集已经存在的测试类和方法

读取src/test/{base package}/{context name}下的所有测试类和方法

### 4. 使用Context Task Template输出目标上下文的任务文档

- 使用*create-doc command， 根据模板task-templ.yaml， 输出任务文档
- subtask要结合已经存在的测试类和方法，只有需要补充的时候才进行新增

### 5. 询问用户是否需要写测试类和方法
- 如果需要， 使用*create-context-test {current task} 命令创建测试类和方法
- 如果不需要， 直接退出
