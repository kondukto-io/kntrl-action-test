import requests
import yaml

def main():
    print("Fetching GitHub zen...")
    try:
        r = requests.get("https://api.github.com/zen", timeout=5)
        print(f"GitHub says: {r.text}")
    except Exception as e:
        print(f"GitHub API: {e}")

    data = yaml.safe_load('message: "kntrl is watching"')
    print(f"YAML parsed: {data}")

if __name__ == "__main__":
    main()
