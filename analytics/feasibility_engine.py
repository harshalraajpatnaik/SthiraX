"""
SthiraX Python Analytics Engine
Regional Feasibility Scoring, Cost Sensitivity Analysis, and Scenario Comparison.
"""

from dataclasses import dataclass, asdict
from typing import Dict, List, Optional
import math


@dataclass
class RegionMetrics:
    region_id: str
    region_name: str
    state: str
    co2_availability_score: float      # 0 to 100
    delivered_co2_cost_score: float    # 0 to 100 (higher means more economical / cheaper)
    feedstock_suitability_score: float # 0 to 100
    plant_density_score: float         # 0 to 100
    construction_demand_score: float   # 0 to 100
    notes: str


@dataclass
class ScoringWeights:
    co2_weight: float = 0.25
    cost_weight: float = 0.20
    feedstock_weight: float = 0.20
    plant_density_weight: float = 0.15
    demand_weight: float = 0.20

    def validate(self) -> bool:
        total = self.co2_weight + self.cost_weight + self.feedstock_weight + self.plant_density_weight + self.demand_weight
        return abs(total - 1.0) < 0.001


class FeasibilityEngine:

    @staticmethod
    def calculate_score(metrics: RegionMetrics, weights: ScoringWeights) -> Dict:
        if not weights.validate():
            raise ValueError("Weights must sum to 1.0")

        composite = (
            (metrics.co2_availability_score * weights.co2_weight) +
            (metrics.delivered_co2_cost_score * weights.cost_weight) +
            (metrics.feedstock_suitability_score * weights.feedstock_weight) +
            (metrics.plant_density_score * weights.plant_density_weight) +
            (metrics.construction_demand_score * weights.demand_weight)
        )
        composite = round(composite, 2)

        return {
            "region_id": metrics.region_id,
            "region_name": metrics.region_name,
            "state": metrics.state,
            "composite_score": composite,
            "rank_rating": "Priority 1" if composite >= 85 else ("Priority 2" if composite >= 75 else "Priority 3"),
            "component_breakdown": {
                "co2_weighted": round(metrics.co2_availability_score * weights.co2_weight, 2),
                "cost_weighted": round(metrics.delivered_co2_cost_score * weights.cost_weight, 2),
                "feedstock_weighted": round(metrics.feedstock_suitability_score * weights.feedstock_weight, 2),
                "plant_density_weighted": round(metrics.plant_density_score * weights.plant_density_weight, 2),
                "demand_weighted": round(metrics.construction_demand_score * weights.demand_weight, 2),
            },
            "strategic_notes": metrics.notes,
        }

    @staticmethod
    def sensitivity_analysis(
        base_price_inr: float,
        base_cost_inr: float,
        price_variations_pct: List[float] = [-10.0, -5.0, 0.0, 5.0, 10.0],
        cost_variations_pct: List[float] = [-10.0, -5.0, 0.0, 5.0, 10.0]
    ) -> List[Dict]:
        """Calculates margin sensitivity across price and cost shifts."""
        matrix = []
        for p_var in price_variations_pct:
            price = base_price_inr * (1.0 + p_var / 100.0)
            for c_var in cost_variations_pct:
                cost = base_cost_inr * (1.0 + c_var / 100.0)
                margin = price - cost
                margin_pct = (margin / price * 100.0) if price > 0 else 0.0
                matrix.append({
                    "price_shift_pct": p_var,
                    "cost_shift_pct": c_var,
                    "effective_price_inr": round(price, 2),
                    "effective_cost_inr": round(cost, 2),
                    "margin_inr": round(margin, 2),
                    "margin_pct": round(margin_pct, 2)
                })
        return matrix
