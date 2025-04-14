#!/bin/bash

# Define variables
MAIN_BRANCH="main"
FEATURE_BRANCH="$1"  # Get the feature branch name from the first script argument

# Ensure a feature branch name is provided
if [ -z "$FEATURE_BRANCH" ]; then
  echo "Usage: ./merge_feature.sh <feature-branch>"
  exit 1
fi

# Fetch the latest changes from remote
echo "Fetching latest changes from remote..."
git fetch origin

# Switch to main branch
echo "Switching to $MAIN_BRANCH..."
git checkout $MAIN_BRANCH

# Pull latest changes from main
echo "Pulling the latest changes from $MAIN_BRANCH..."
git pull origin $MAIN_BRANCH

# Switch to feature branch
echo "Switching to $FEATURE_BRANCH..."
git checkout $FEATURE_BRANCH

# Merge main into the feature branch (optional but recommended)
echo "Merging $MAIN_BRANCH into $FEATURE_BRANCH..."
git merge $MAIN_BRANCH

# Check if the merge was successful
if [ $? -ne 0 ]; then
  echo "Merge conflicts detected. Please resolve them and then run 'git add .' followed by 'git commit'.  After that rerun script."
  exit 1
else
  echo "Merge of $MAIN_BRANCH into $FEATURE_BRANCH completed successfully."
fi

# Switch back to main branch
echo "Switching back to $MAIN_BRANCH..."
git checkout $MAIN_BRANCH

# Merge the feature branch into main
echo "Merging $FEATURE_BRANCH into $MAIN_BRANCH..."
git merge $FEATURE_BRANCH --no-ff

# Check if the merge was successful
if [ $? -ne 0 ]; then
  echo "Merge conflicts detected. Please resolve them and then run 'git add .' followed by 'git commit'."
  exit 1
else
  echo "Merge of $FEATURE_BRANCH into $MAIN_BRANCH completed successfully."
fi

# Push the merged changes to remote main
echo "Pushing changes to remote $MAIN_BRANCH..."
git push origin $MAIN_BRANCH

echo "Merge process completed successfully!"