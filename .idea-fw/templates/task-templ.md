template:
  id: task-template-v1
  name: Task Document
  version: 1.0
  output:
    format: markdown
    filename: docs/tasks/{{context_name}}.{{task_num}}.{{task_title_short}}.md
    title: "Task {{context_name}}.{{task_num}}: {{task_title_short}}"

workflow:
  mode: interactive
  elicitation: advanced-elicitation

agent_config:
  editable_sections: 
    - Status
    - Task
    - Subtasks
    - Dev Notes
    - Testing
    - Change Log

sections:
  - id: status
    title: Status
    type: choice
    choices: [Draft, Approved, InProgress, Review, Done]
    instruction: Select the current status of the task
    owner: architect
    editors: [architect, dev-agent]
    
  - id: task
    title: Task
    type: template-text
    template: |
      **Context Name** {{context_name}},
      **Has these applications** {{has_applications}},
      **Deliver these features** {{features}}
    instruction: Define the application services of this boundary context, and the features they deliver.

    elicit: true
    owner: architect
    editors: [architect]
    
    
  - id: subtasks
    title: Subtasks
    type: bullet-list
    instruction: |
      将这个界限上下文要做的事情拆解成任务, 每个任务都有一个或多个子任务， 子任务一般是对应用服务的实现.
      每个任务和子任务都有验收标准，验收标准就是对应的测试用例通过；每个任务标明对应的测试用例class， 子任务应该有一个或多个测试类的方法.
      主任务的测试用例写完之后是Draft状态，需要

    template: |
      - [ ] Task 1
        TestCase
            - class: com.example.UnitTest1
            - status: {Draft | Approved | Review | Done}
        - [ ] Subtask1.1...
            Test
                - method: com.example.UnitTest1#testSubtask11
                - status: {Pending | Review | Done}
        
      - [ ] Task 2
        TestCase
            - class: com.example.UnitTest2
            - status: {Draft | Approved | Review | Done}
        - [ ] Subtask 2.1...
            Test
                - method: com.example.UnitTest2#testSubtask21
                - status: {Pending | Review | Done}
      - [ ] Task 3
        TestCase
            - class: com.example.UnitTest3
            - status: {Draft | Approved | Review | Done}
        - [ ] Subtask 3.1...
            Test
                - method: com.example.UnitTest3#testSubtask31
                - status: {Pending | Review | Done}
    elicit: true
    owner: architect
    editors: [architect, dev-agent]
    
        
  - id: change-log
    title: Change Log
    type: table
    columns: [Date, Version, Description, Author]
    instruction: Track changes made to this task document
    owner: architect
    editors: [architect, dev-agent]
    
  