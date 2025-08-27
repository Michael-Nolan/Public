import sys
import subprocess

def run_git_command(command):
    """
    Runs a git command and handles errors.

    Args:
        command (list): A list of strings representing the command and its arguments.

    Returns:
        str: The stdout output of the command.
    
    Raises:
        subprocess.CalledProcessError: If the command returns a non-zero exit code.
    """
    try:
        # The 'capture_output=True' flag captures stdout and stderr.
        # 'text=True' ensures the output is decoded as a string.
        result = subprocess.run(
            ['git'] + command,
            check=True,
            capture_output=True,
            text=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error executing git command: {' '.join(e.cmd)}")
        print(f"Stdout: {e.stdout}")
        print(f"Stderr: {e.stderr}")
        sys.exit(1)

def automate_git_workflow():
    # 1. Check if we are on the 'main' branch.
    print("Checking current branch...")
    current_branch = run_git_command(['branch', '--show-current'])
    if current_branch != 'main':
        print(f"Current branch is not 'main'. Found: '{current_branch}'. Exiting.")
        sys.exit(1)
    print("Currently on the 'main' branch.")

    # 2. Check for changes besides the 'abc/' folder.
    print("Checking for changes outside the 'abc/' directory...")
    # Get the status of all files, including untracked ones.
    status_output = run_git_command(['status', '--porcelain'])
    
    if  len(status_output) >2 :
        print("Changes present. Exiting.")
        # sys.exit(0)
    
    result = subprocess.run(
            ['python3'] + ["download.py"],
            check=True,
            capture_output=True,
            text=True
        )
    print(result.stdout.strip())

    # 3. Checkout to a new branch named 'eia_graphs'.
    run_git_command(['checkout', '-b', 'eia_graphs'])
    print("Switched to branch 'eia_graphs'.")
    # Add the changes from the 'abc/' directory
    run_git_command(['add', './'])
    # 4. Commit the current changes with the commit message "updating eia_graphs".
    run_git_command(['commit', '-m', 'updating eia_graphs'])
    # 5. Push the branch to the origin.
    run_git_command(['push', 'origin', 'eia_graphs'])
    # 6. Delete the local branch.
    run_git_command(['checkout', 'main'])
    run_git_command(['branch', '-D', 'eia_graphs'])


    print("Workflow completed successfully!")

if __name__ == "__main__":
    automate_git_workflow()
