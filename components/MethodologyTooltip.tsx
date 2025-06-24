'use client'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // Importa os estilos base do Tippy
import 'tippy.js/animations/scale.css'; // Importa uma animação (opcional)
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'

// Componente para o conteúdo do Tooltip
const MethodologyContent = () => (
    <div className="p-2 text-left max-w-xs text-sm">
        <h3 className="font-bold text-base mb-2">Pain Score Methodology</h3>
        <div className="space-y-2">
            <p>
                The Pain Score (0-100) quantifies market fear.
                <strong className="block mt-1">A higher score means more pain.</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
                <li>
                    <strong>Recent Volatility:</strong> A weighted average of price drops over 24h, 7d, and 30d periods.
                </li>
                <li>
                    <strong>Panic Bonus:</strong> Extra points are added for sharp, sudden drops (&gt;10% in 24h).
                </li>
            </ul>
            <p className="mt-2 text-xs italic">
                Disclaimer: Not financial advice. DYOR.
            </p>
        </div>
    </div>
);

export default function MethodologyTooltip() {
    return (
        <Tippy
            content={<MethodologyContent />}
            animation="scale"
            placement="bottom"
            interactive={true} // Permite que o usuário interaja com o conteúdo do tooltip
        >
            <div className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer">
                <QuestionMarkCircleIcon className="h-5 w-5" />
            </div>
        </Tippy>
    )
}