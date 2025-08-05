import { TradingSetup } from "../types/trading"

export const setupsDataExport: TradingSetup[] = [
    {
        id: "TSLA",
        ticker: "TSLA",
        companyName: "Tesla Inc.",
        direction: "LONG",
        entry: 323.74,
        stopLoss: 311.66,
        breakEven: {
            price: 331,
            instruction: "Mover stop a punto de entrada ($323.74) si alcanza $331",
        },
        targets: [341, 349, 384, 490],
        riskManagement: {
            maxRisk: "-2%",
            positionSize: "2 acciones por cada $1,000 en cuenta",
        },
        optionsSetup: {
            type: "CALL",
            expiration: "17 OCTUBRE",
            strike: 330,
            riskPerContract: 550,
            potentialMin: 1200,
            potentialMax: 13000,
            notes: "Vender si llega a stop o target. Si alcanza BE, sostener contrato solo si está en positivo.",
        },
    },

]
