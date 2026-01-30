import fetch from 'node-fetch';

const API = 'http://localhost:3000/api';

async function verify() {
    try {
        console.log('1. Fetching SOS...');
        const sosRes = await fetch(`${API}/sos`);
        const sosList = await sosRes.json();
        const sos = sosList.find(s => !s.assigned_vehicle_id);
        if (!sos) throw new Error('No unassigned SOS found');
        console.log('   Target SOS:', sos.id);

        console.log('2. Fetching Vehicles...');
        const vRes = await fetch(`${API}/vehicles`);
        const vList = await vRes.json();
        const vehicle = vList.find(v => v.id === 'AMB-01');
        if (!vehicle) throw new Error('AMB-01 not found');
        console.log('   Target Vehicle:', vehicle.id, vehicle.status);

        console.log('3. Assigning...');
        const assignRes = await fetch(`${API}/assign`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sosId: sos.id, vehicleId: vehicle.id })
        });
        const assignResult = await assignRes.json();
        if (!assignRes.ok) throw new Error(JSON.stringify(assignResult));
        console.log('   Assignment OK:', assignResult);

        console.log('4. Verifying Vehicle Status...');
        const vRes2 = await fetch(`${API}/vehicles`);
        const vList2 = await vRes2.json();
        const v2 = vList2.find(v => v.id === 'AMB-01');
        if (v2.status !== 'ASSIGNED') throw new Error(`Status mismatch: ${v2.status}`);
        console.log('   Status Verified: ASSIGNED');

        console.log('SUCCESS: End-to-End flow verified.');
    } catch (e) {
        console.error('FAILED:', e);
        process.exit(1);
    }
}

verify();
