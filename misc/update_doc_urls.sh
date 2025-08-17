#!/usr/bin/env bash
# Update documentation URLs in files based on version

set -e

# Default values
RELATIVE=false
FILES=()

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -r|--relative)
            RELATIVE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [-r|--relative] [files...]"
            echo "  -r, --relative  Use relative paths instead of full URLs"
            echo "  files...        Files to process (if none specified, uses doc_classes/*.xml)"
            exit 0
            ;;
        *)
            FILES+=("$1")
            shift
            ;;
    esac
done

# If no files specified, default to XML files in doc_classes
if [[ ${#FILES[@]} -eq 0 ]]; then
    FILES=(addons/godot_xterm/native/doc_classes/*.xml)
fi

# Get version from plugin.cfg
VERSION=$(grep '^version=' addons/godot_xterm/plugin.cfg | cut -d'=' -f2 | tr -d '"')
echo "Detected version: $VERSION"

# Extract major.minor version (e.g., "4.0.0-rc.3" -> "4.0")
DOC_VERSION=$(echo "$VERSION" | sed -E 's/([0-9]+\.[0-9]+).*/\1/')
echo "Documentation version: $DOC_VERSION"

# Determine URL based on version and relative flag
if [[ "$RELATIVE" == true ]]; then
    # Use relative paths for RST files
    DOCS_URL=".."
    echo "Using relative path: $DOCS_URL"
else
    # Use full documentation URL
    if [[ "$VERSION" == *"-"* ]]; then
        # Pre-release versions (rc, alpha, beta) go to "latest"
        DOCS_URL="https://docs.godot-xterm.nix.nz/en/latest"
        echo "Pre-release detected, using: $DOCS_URL"
    else
        # Stable versions got to versioned docs
        DOCS_URL="https://docs.godot-xterm.nix.nz/en/$DOC_VERSION"
        echo "Stable version, using: $DOCS_URL"
    fi
fi

# Replace placeholder in specified files
for file in "${FILES[@]}"; do
    if [[ -f "$file" ]]; then
        sed "s|\$GODOT_XTERM_DOCS_URL|$DOCS_URL|g" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
        echo "Updated: $file"
    else
        echo "Warning: File not found: $file"
    fi
done

echo "URLs replaced with: $DOCS_URL"