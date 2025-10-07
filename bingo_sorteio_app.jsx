import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function BingoApp() {
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [lastNumber, setLastNumber] = useState(null);
  const [cardNumbers, setCardNumbers] = useState("");
  const [checkResult, setCheckResult] = useState("");

  const sortNumber = () => {
    if (sortedNumbers.length >= 99) return;

    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 99) + 1;
    } while (sortedNumbers.includes(newNumber));

    setSortedNumbers([...sortedNumbers, newNumber]);
    setLastNumber(newNumber);
  };

  const checkCard = () => {
    const numbers = cardNumbers
      .split(/[ ,]+/)
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));

    const allCalled = numbers.every((n) => sortedNumbers.includes(n));

    if (numbers.length === 0) {
      setCheckResult("Digite os números da cartela.");
    } else if (allCalled) {
      setCheckResult("🎉 Todos os números da cartela já foram sorteados!");
    } else {
      const missing = numbers.filter((n) => !sortedNumbers.includes(n));
      setCheckResult(`❌ Faltam os números: ${missing.join(", ")}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-blue-800">
            🎲 Sorteador de Bingo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <motion.div
            key={lastNumber}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold text-blue-600"
          >
            {lastNumber ?? "-"}
          </motion.div>

          <div className="flex gap-2">
            <Button onClick={sortNumber} disabled={sortedNumbers.length >= 99}>
              Sortear número
            </Button>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mt-4 text-blue-700">Números sorteados (ordem de sorteio):</h3>
            <p className="min-h-[2rem] break-words">{sortedNumbers.join(", ") || "Nenhum ainda"}</p>

            <h3 className="font-semibold mt-4 text-blue-700">Números em ordem crescente:</h3>
            <p className="min-h-[2rem] break-words">
              {[...sortedNumbers].sort((a, b) => a - b).join(", ") || "Nenhum ainda"}
            </p>
          </div>

          <div className="w-full mt-6">
            <h3 className="font-semibold text-blue-700 mb-2">Verificar cartela:</h3>
            <Input
              placeholder="Ex: 5, 12, 47, 60, 88 ou 5 12 47 60 88"
              value={cardNumbers}
              onChange={(e) => setCardNumbers(e.target.value)}
            />
            <Button onClick={checkCard} className="mt-2 w-full">
              Verificar
            </Button>
            {checkResult && (
              <p className="mt-3 text-center text-blue-800 font-medium">{checkResult}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
