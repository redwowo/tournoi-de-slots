# Import Script Documentation

## 📥 Import players.json to Firestore

This script imports all categories and players from `players.json` into Firestore collections.

### Prerequisites

1. **Firebase Service Account Key**
   - Go to Firebase Console
   - Navigate to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the file as `serviceAccountKey.json` in the project root

2. **Install Dependencies**
   ```bash
   npm install
   ```

### Running the Import Script

```bash
node import-players-to-firestore.js
```

### What Gets Imported

#### Categories Collection
Each category document contains:
- `name` - Category name (e.g., "Hacksaw Gaming")
- `color` - Hex color code (e.g., "#123456")
- `imagePath` - Path to category logo (e.g., "/newhacksawlogo.png")
- `lastUpdated` - Firestore server timestamp

#### Players Collection
Each player document contains:
- `id` - Original player ID from players.json (e.g., 1, 2, 3...)
- `name` - Player/slot name (e.g., "Booze Bash")
- `category` - Category name reference (e.g., "Hacksaw Gaming")
- `lastUpdated` - Firestore server timestamp

### Expected Output

```
📥 Importing categories...
  ✅ Hacksaw Gaming
  ✅ Nolimit City
  ✅ Pragmatic Play

📥 Importing players...
  ✅ [1] Booze Bash (Hacksaw Gaming)
  ✅ [2] Ultimate Slot of America (Hacksaw Gaming)
  ✅ [3] Spinman (Hacksaw Gaming)
  ...

✅ Import completed!
📊 3 categories imported
📊 XXX players imported
```

### Important Notes

- The script preserves the original `id` field from players.json
- Each import creates **new documents** in Firestore
- Run the script only once to avoid duplicates
- The `serviceAccountKey.json` file is excluded from git for security

### Troubleshooting

**Error: serviceAccountKey.json not found**
- Download the service account key from Firebase Console
- Place it in the project root directory

**Error: players.json not found**
- Ensure `players.json` exists in the project root

**Error: Permission denied**
- Verify your Firebase service account has Firestore read/write permissions
- Check that the project ID matches your Firebase project
