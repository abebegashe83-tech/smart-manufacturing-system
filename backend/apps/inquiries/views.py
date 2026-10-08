from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Inquiry
from .serializers import InquirySerializer


@api_view(['POST'])
def inquiry_form(request):
    serializer = InquirySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    inquiry = serializer.save()

    return Response({
        'status': 'success',
        'message': 'Inquiry received successfully.',
        'submitted': InquirySerializer(inquiry).data,
    }, status=201)
