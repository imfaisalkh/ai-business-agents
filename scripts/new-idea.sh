#!/bin/bash

# Create a new idea from template
# Usage: ./scripts/new-idea.sh my-idea-name

IDEA_NAME=$1
BASE_DIR="$(dirname "$0")/.."
TEMPLATE_DIR="$BASE_DIR/ideas/_template"
TARGET_DIR="$BASE_DIR/ideas/$IDEA_NAME"

if [ -z "$IDEA_NAME" ]; then
    echo "❌ Please provide an idea name"
    echo "Usage: ./scripts/new-idea.sh my-idea-name"
    exit 1
fi

if [ -d "$TARGET_DIR" ]; then
    echo "❌ Idea '$IDEA_NAME' already exists"
    exit 1
fi

# Copy template
cp -r "$TEMPLATE_DIR" "$TARGET_DIR"

# Update README with idea name
sed -i '' "s/\[Your Idea Name\]/$IDEA_NAME/g" "$TARGET_DIR/README.md"

echo "✅ Created new idea: $IDEA_NAME"
echo ""
echo "Next steps:"
echo "  1. cd ideas/$IDEA_NAME"
echo "  2. Fill out business-context.md"
echo "  3. Run Marketing Manager agent first"
echo ""
