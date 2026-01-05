export interface MedicalReport {
    id: string;            // uint256 → string
    cid: string;           // IPFS CID
    meta: string;          // description / notes
    patient: string;       // Ethereum address
    doctor: string;        // Ethereum address (zero address if unassigned)
    timestamp: number;     // Unix timestamp (seconds)
}
