from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def company_overview(request):
    return Response({
        'name': 'Super Double T General Trading PLC',
        'tagline': 'Quality Products. Stronger Industries.',
        'supporting_message': 'Manufactured for Ethiopia, built for lasting performance.',
        'business_areas': [
            'Rodas Paint',
            'Water Products',
            'Metal Products',
            'Other Manufacturing',
        ],
    })
