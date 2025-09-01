# delay-catcher

Dieses Projekt ermöglicht es, über die Deutsche Bahn API verspätete Züge an einem bestimmten Bahnhof abzurufen und diese im csv-Format abzuspeichern.
Dabei werden alle Regionalzüge mit einer Verspätung von mindestens 60 min gespeichert.

Inspiriert durch diesen [Reddit-Thread](https://www.reddit.com/r/deutschebahn/comments/1evid66/deutschlandticket_entsch%C3%A4digungen_beantragen/).

## Installation

```
npm install delay-catcher
```

## Nutzung

```
npx delay-catcher <stationCode> <path>
```

`<stationCode>` ist dabei die [Interne Bahnhofsnummer (IBNR)](https://de.wikipedia.org/wiki/Interne_Bahnhofsnummer), die jeden Bahnhof identifiziert. Der Code für Köln Hbf ist beispielsweise `8000207`.

`<path>` gibt das Verzeichnis an, unter dem die Daten gespeichert werden sollen. Default ist `""`.

Der Befehl ruft alle Verspätungen für den vorherigen Tag am Zielbahnhof ab und fügt die Daten zu `<path>/<Jahr>/delays<Monatsnummer>.csv` hinzu, bzw. erstellt die Datei, falls diese noch nicht existiert.

Wenn eine gefundene Verspätung schon in der csv steht, dann wird sie nicht mehr hinzugefügt.

### Beispiel:
| Startbahnhof     | Zugnummer       | Zielbahnhof | Ankunft_Plan        | Ankunft_tatsächlich | Verspätung |
|------------------|-----------------|-------------|---------------------|---------------------|------------|
| Bedburg(Erft)    | RB 38 (10289)   | Köln Hbf    | 01.06.2025, 01:28   | 01.06.2025, 03:58   | 150        |
| Aachen Hbf       | RE 1 (26845)    | Köln Hbf    | 01.06.2025, 01:44   | 01.06.2025, 03:52   | 129        |
| Hamm(Westf)Hbf   | RE 1 (26800)    | Köln Hbf    | 01.06.2025, 05:12   | 01.06.2025, 06:26   | 75         |
| Hamm(Westf)Hbf   | RE 1 (26810)    | Köln Hbf    | 01.06.2025, 10:12   | 01.06.2025, 11:13   | 62         |
| Koblenz Hbf      | RB 26 (25432)   | Köln Hbf    | 02.06.2025, 18:02   | 02.06.2025, 19:15   | 73         |
| Hamm(Westf)Hbf   | RE 1 (26838)    | Köln Hbf    | 03.06.2025, 00:12   | 03.06.2025, 01:38   | 87         |
| Hamm(Westf)Hbf   | RE 1 (26802)    | Köln Hbf    | 03.06.2025, 06:12   | 03.06.2025, 07:37   | 86         |


### .env Datei

Wichtig: Das Verzeichnis muss eine .env Datei mit USERAGENT=<Identifikation> enthalten. Der Wert kann beispielsweise eine Mailadresse oder URL sein.

## License

This project is licensed under the [MIT License](LICENSE).
