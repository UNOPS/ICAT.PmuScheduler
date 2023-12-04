# TraCAD - PMU Scheduler

Backend service for ICAT Climate Action Assessment Tool for Transport Sector - TraCAD. This application synchronize the PMU database with the Calculation Engine database using CRON jobs.

Supported by [Initiative for Climate Action Transparency - ICAT](https://climateactiontransparency.org/).

Built using [Node.js 16](https://nodejs.org/dist/latest-v16.x/docs/api/) and [Nest](https://github.com/nestjs/nest) framework.

## Database Configuration

This application uses a [MySQL Database](https://www.mysql.com/). The `ICAT-PMU.sql` configuration file containing the database schema and some dummy data is provided in the PMUPortalService repository.

## Manual Installation

1. Download and install the [Node.js 16 LTS version](https://nodejs.org/en/download/releases) for your operational system.

2. Download or clone this repository.

3. In the terminal, go to this repository's main folder.

4. Install the NPM dependencies (including Nest) with the command:

```bash
$ npm install --force
```

5. Set up the Environment Variables

   - In the machine:
      - **Windows:** using the `set` command in the terminal
      - **Linux/MacOS:** using the `export` command in the terminal

   - Or creating a `.env` file using `.env.example` as base

6. Run the app:

```bash
$ npm run start
```

## Google Cloud Installation with Docker

> This is an example cloud installation using [Docker](https://www.docker.com/) and Google Cloud Plataform. The provided `Dockerfile` can be used for local or cloud installation with different services.

1. In GCP Console, go to [Artifact Registry](https://console.cloud.google.com/artifacts) and enable the Artifact Registry API

2. In the Artifact Registry, create a new repository:

   - **Format:** Docker
   - **Type:** Standard
   - **Location:** desired application location
   - **Encryption:** Google-managed key

3. Download and install [gcloud CLI](https://cloud.google.com/sdk/docs/install).

4. Download or clone this repository.

5. In the terminal, go to this repository's main folder.

6. Build your container in the Artifacts Register using the provided `Dockerfile`. The container path can be found on the Artifact Registry's repository page.

```bash
$ gcloud builds submit --tag [CONTAINER PATH]
```

7. Go to [Cloud Run](https://console.cloud.google.com/run) and create a New Service:
   - Choose the option `Deploy one revision from an existing container image` and select the container image updated in the previous step
   - Add a service name
   - Select the application region
   - Select `Allow unauthenticated invocations` in the Authentication option
   - In the **Container section**:
     - Select Container port 8084
     - Add the Environment Variables
     - Add the Cloud SQL connections

> Noticed that some [special permissions in GCP](https://cloud.google.com/run/docs/reference/iam/roles#additional-configuration) can be necessary to perform these tasks.

## Environment Variables

The environment variables should be declared as follow:

| Variable name         | Description            |
| --------------------- | ---------------------- |
| `PORT`                | Application Port       |
| `DATABASE_HOST`       | Database Host(*)       |
| `SOCKET_PATH`         | Database Socket Path(*)|
| `DATABASE_PORT`       | Database Port          |
| `DATABASE_USER`       | Database Socket User   |
| `DATABASE_PASSWORD`   | Database Password      |
| `DATABASE_NAME`       | Database Name          |
| `CAL_ENGINE_BASE_URL` | Calculation Engine URL |

> (*) Can be used the Database Host or the Database Socket Path depending of the database configuration

## Dependencies

This application consumes data from CalculationEngine application API and updates the shared database.

The complete dependency diagram of TraCAD Country and PMU applications:

<p align="left">
  <img src="https://lucid.app/publicSegments/view/7e56ab6c-3c14-428b-be1d-63dfd33760be/image.png" width="800" alt="TraCAD Diagram" /></a>
</p>

## License

TraCAD - CountryPortalService is [Affero GPL licensed](https://www.gnu.org/licenses/agpl-3.0.en.html).
