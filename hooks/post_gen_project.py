# -*- python3 -*-
import subprocess

def step(args):
    try:
        subprocess.run(args, check=True)
    except subprocess.CalledProcessError as e:
        raise SystemExit(e.returncode)
    
try:
    subprocess.run(['git', 'version'], check=True)
except subprocess.CalledProcessError as e:
    print("Coult not execute git - Did not create initial commit"

step(["git", "init"])
step(["git", "add", "."])
step(["git", "commit", "-m", "initial commit, created by cookiecutter-mystl"])
step(["git", "branch", "-m", "{{ cookiecutter.main_branch_name }}"])

print("Successfully made initial commit of project")
