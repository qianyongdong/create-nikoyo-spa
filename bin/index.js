#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

program
  .version("1.0.0")
  .description("Create a new Nikoyo SPA project")
  .action(async () => {
    try {
      // 询问项目名称
      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "请输入项目名称:",
          validate: (input) => {
            if (!input) return "项目名称不能为空";
            if (fs.existsSync(input)) return "该目录已存在";
            return true;
          },
        },
      ]);

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

      const spinner = ora("正在创建项目...").start();

      // 创建项目目录
      fs.mkdirSync(projectName);
      process.chdir(projectName);

      // 根据项目类型克隆不同的模板
      const templateRepo =
        projectType === "root"
          ? "https://github.com/your-org/nikoyo-root-template.git"
          : "https://github.com/your-org/nikoyo-app-template.git";

      execSync(`git clone ${templateRepo} .`, { stdio: "ignore" });

      // 更新 package.json 中的项目名称
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageJson.name = `${projectType}-${projectName}`;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // 删除 .git 目录
      fs.rmSync(path.join(process.cwd(), ".git"), {
        recursive: true,
        force: true,
      });

      spinner.succeed(chalk.green("项目创建成功！"));
      console.log(chalk.blue("\n下一步:"));
      console.log(`  cd ${projectName}`);
      console.log("  npm install");
      console.log("  npm run dev\n");
    } catch (error) {
      console.error(chalk.red("创建项目时发生错误:"), error);
      process.exit(1);
    }
  });

program.parse(process.argv);
