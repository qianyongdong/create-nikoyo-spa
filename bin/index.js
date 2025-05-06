#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer").default;
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const fs = require("fs-extra");

program
  .version("1.0.0")
  .description("Create a new Nikoyo SPA project")
  .action(async () => {
    try {
      // 询问项目类型
      const { projectType } = await inquirer.prompt([
        {
          type: "list",
          name: "projectType",
          message: "请选择项目类型:",
          choices: [
            { name: "Root Project", value: "root" },
            { name: "App Project", value: "app" },
          ],
        },
      ]);

      // 询问项目名称
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称:",
          validate: (input) => {
            if (!input) return "项目名称不能为空";
            if (fs.existsSync(`${projectType}-${input}`)) return "该目录已存在";
            return true;
          },
        },
      ]);

      // 完整项目名称
      const fullProjectName = `${projectType}-${projectName}`;

      const spinner = ora("正在创建项目...").start();

      // 获取模板目录路径
      const templateDir = path.join(__dirname, "..", "packages", projectType);

      // 检查模板目录是否存在
      if (!fs.existsSync(templateDir)) {
        throw new Error(`模板目录 ${templateDir} 不存在`);
      }

      // 创建项目目录
      fs.mkdirSync(fullProjectName);

      // 复制模板文件到项目目录
      fs.copySync(templateDir, fullProjectName);

      // 更新 package.json 中的项目名称
      const packageJsonPath = path.join(
        process.cwd(),
        fullProjectName,
        "package.json"
      );
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8")
        );
        packageJson.name = fullProjectName;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }

      spinner.succeed(chalk.green("项目创建成功！"));
      console.log(chalk.blue("\n下一步:"));
      console.log(`  cd ${fullProjectName}`);
      console.log("  npm install");
      console.log("  npm run dev\n");
    } catch (error) {
      console.error(chalk.red("创建项目时发生错误:"), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
