"use client";

import { Check } from "lucide-react";

export default function Pricing01() {
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Plan */}
                <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Basic</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Essential features for individuals.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">$0</span>
                        <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        {[
                            "1 User",
                            "5 Projects",
                            "Community Support",
                            "Basic Analytics"
                        ].map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                                <Check className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-lg transition-colors">
                        Get Started
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="flex flex-col p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        POPULAR
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Pro</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Advanced features for power users.</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">$29</span>
                        <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        {[
                            "Unlimited Users",
                            "Unlimited Projects",
                            "Priority Support",
                            "Advanced Analytics",
                            "Custom Domains",
                            "API Access"
                        ].map((feature) => (
                            <li key={feature} className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
                                <Check className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>
    );
}
